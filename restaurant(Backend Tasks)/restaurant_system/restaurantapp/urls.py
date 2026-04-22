from django.urls import path
from .views import (
    MenuListView,
    TableListView,
    ReservationCreateView,
    InventoryUpdateView,
    OrderCreateView,
    OrderListView
)

urlpatterns = [
    path('menu/', MenuListView.as_view(), name='menu-list'),
    path('tables/', TableListView.as_view(), name='table-list'),
    path('reservations/', ReservationCreateView.as_view(), name='reservation-create'),
    path('inventory/<int:pk>/', InventoryUpdateView.as_view(), name='inventory-update'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
]