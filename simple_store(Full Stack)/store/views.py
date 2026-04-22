from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .models import Product, Order, OrderItem
from .forms import RegisterForm

def home(request):
    products = Product.objects.all()
    return render(request, 'store/home.html', {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'store/product_detail.html', {'product': product})

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'store/register.html', {'form': form})

@login_required
def add_to_cart(request, pk):
    product = get_object_or_404(Product, pk=pk)
    order, created = Order.objects.get_or_create(user=request.user, is_completed=False)
    item, created = OrderItem.objects.get_or_create(order=order, product=product)

    if not created:
        item.quantity += 1
        item.save()

    return redirect('cart')

@login_required
def cart_view(request):
    order = Order.objects.filter(user=request.user, is_completed=False).first()
    items = order.items.all() if order else []
    total = sum(item.total_price() for item in items)
    return render(request, 'store/cart.html', {
        'order': order,
        'items': items,
        'total': total
    })

@login_required
def remove_from_cart(request, pk):
    item = get_object_or_404(OrderItem, pk=pk, order__user=request.user, order__is_completed=False)
    item.delete()
    return redirect('cart')

@login_required
def checkout(request):
    order = Order.objects.filter(user=request.user, is_completed=False).first()
    if order:
        order.is_completed = True
        order.save()
    return render(request, 'store/checkout.html')