from django.contrib import admin
from .models import MenuItem, Table, Reservation, Inventory, Order, OrderItem

admin.site.register(MenuItem)
admin.site.register(Table)
admin.site.register(Reservation)
admin.site.register(Inventory)
admin.site.register(Order)
admin.site.register(OrderItem)