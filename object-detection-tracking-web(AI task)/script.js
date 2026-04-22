const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");
const objectCountText = document.getElementById("objectCount");

let model = null;
let stream = null;
let animationId = null;

let trackedObjects = [];
let nextId = 1;

const MAX_DISTANCE = 80;
const MAX_MISSED_FRAMES = 15;
const MIN_SCORE = 0.6;

async function loadModel() {
  try {
    statusText.textContent = "Loading model...";
    model = await cocoSsd.load();
    statusText.textContent = "Model loaded successfully";
  } catch (error) {
    console.error("Model load error:", error);
    statusText.textContent = "Failed to load model";
  }
}

async function startCamera() {
  try {
    if (!model) {
      await loadModel();
    }

    if (!model) {
      statusText.textContent = "Model unavailable";
      return;
    }

    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      statusText.textContent = "Camera started";
      detectFrame();
    };
  } catch (error) {
    console.error("Camera access error:", error);
    statusText.textContent = "Could not access camera";
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trackedObjects = [];
  objectCountText.textContent = "0";
  statusText.textContent = "Camera stopped";
}

function getCentroid(bbox) {
  const [x, y, width, height] = bbox;
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}

function getDistance(c1, c2) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function updateTracker(predictions) {
  const detections = predictions.map(pred => ({
    bbox: pred.bbox,
    class: pred.class,
    score: pred.score,
    centroid: getCentroid(pred.bbox),
    matched: false
  }));

  trackedObjects.forEach(obj => {
    obj.updated = false;
  });

  for (const detection of detections) {
    let bestMatch = null;
    let bestDistance = Infinity;

    for (const tracked of trackedObjects) {
      if (tracked.class !== detection.class) continue;

      const dist = getDistance(tracked.centroid, detection.centroid);

      if (dist < bestDistance && dist < MAX_DISTANCE) {
        bestDistance = dist;
        bestMatch = tracked;
      }
    }

    if (bestMatch) {
      bestMatch.bbox = detection.bbox;
      bestMatch.centroid = detection.centroid;
      bestMatch.score = detection.score;
      bestMatch.missedFrames = 0;
      bestMatch.updated = true;
      detection.matched = true;
    }
  }

  for (const detection of detections) {
    if (!detection.matched) {
      trackedObjects.push({
        id: nextId++,
        bbox: detection.bbox,
        centroid: detection.centroid,
        class: detection.class,
        score: detection.score,
        missedFrames: 0,
        updated: true
      });
    }
  }

  for (const tracked of trackedObjects) {
    if (!tracked.updated) {
      tracked.missedFrames += 1;
    }
  }

  trackedObjects = trackedObjects.filter(
    tracked => tracked.missedFrames <= MAX_MISSED_FRAMES
  );
}

function drawTrackedObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const obj of trackedObjects) {
    const [x, y, width, height] = obj.bbox;

    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = "#00ff88";
    ctx.font = "18px Arial";
    const text = `${obj.class} | ID: ${obj.id}`;
    ctx.fillText(text, x, y > 20 ? y - 8 : y + 20);

    ctx.beginPath();
    ctx.arc(obj.centroid.x, obj.centroid.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ff3b30";
    ctx.fill();
  }

  objectCountText.textContent = trackedObjects.length;
}

async function detectFrame() {
  if (!model || !stream) return;

  try {
    const predictions = await model.detect(video);

    const filteredPredictions = predictions.filter(
      pred => pred.score >= MIN_SCORE
    );

    updateTracker(filteredPredictions);
    drawTrackedObjects();

    statusText.textContent = "Detection running";
  } catch (error) {
    console.error("Detection error:", error);
    statusText.textContent = "Detection failed";
  }

  animationId = requestAnimationFrame(detectFrame);
}

startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);

window.addEventListener("DOMContentLoaded", loadModel);