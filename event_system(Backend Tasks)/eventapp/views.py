from rest_framework import generics
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer


class UserRegistrationListView(generics.ListAPIView):
    serializer_class = RegistrationSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Registration.objects.filter(user_id=user_id)


class RegistrationDeleteView(generics.DestroyAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer