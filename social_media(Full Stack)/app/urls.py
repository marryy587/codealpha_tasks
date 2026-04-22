from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register_view, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='app/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('create-post/', views.create_post, name='create_post'),
    path('comment/<int:post_id>/', views.add_comment, name='add_comment'),
    path('like/<int:post_id>/', views.like_post, name='like_post'),
    path('profile/<str:username>/', views.profile_view, name='profile'),
    path('follow/<str:username>/', views.follow_toggle, name='follow_toggle'),
    path('users/', views.users_list, name='users_list'),
]
