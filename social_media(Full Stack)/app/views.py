from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Profile, Post, Comment, Like, Follow
from .forms import RegisterForm, PostForm, CommentForm

def home(request):
    posts = Post.objects.all().order_by('-created_at')
    comment_form = CommentForm()
    return render(request, 'app/home.html', {'posts': posts, 'comment_form': comment_form})


def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            Profile.objects.create(user=user)
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'app/register.html', {'form': form})


@login_required
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()
            return redirect('home')
    else:
        form = PostForm()
    return render(request, 'app/create_post.html', {'form': form})


@login_required
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.post = post
            comment.save()
    return redirect('home')


@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    like, created = Like.objects.get_or_create(post=post, user=request.user)
    if not created:
        like.delete()
    return redirect('home')


def profile_view(request, username):
    user_obj = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user_obj)
    posts = Post.objects.filter(user=user_obj).order_by('-created_at')

    is_following = False
    if request.user.is_authenticated and request.user != user_obj:
        is_following = Follow.objects.filter(follower=request.user, following=user_obj).exists()

    context = {
        'profile_user': user_obj,
        'profile': profile,
        'posts': posts,
        'is_following': is_following
    }
    return render(request, 'app/profile.html', context)


@login_required
def follow_toggle(request, username):
    target_user = get_object_or_404(User, username=username)

    if request.user != target_user:
        relation, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target_user
        )
        if not created:
            relation.delete()

    return redirect('profile', username=username)
def users_list(request):
    users = User.objects.all()
    return render(request, 'app/users_list.html', {'users': users})