import java.util.HashMap;

public class Portfolio {

    HashMap<String, Integer> holdings = new HashMap<>();
    double balance = 10000; // starting money

    public void buyStock(Stock stock, int quantity) {
        double cost = stock.price * quantity;

        if (cost > balance) {
            System.out.println(" Not enough balance!");
            return;
        }

        balance -= cost;
        holdings.put(stock.name,
                holdings.getOrDefault(stock.name, 0) + quantity);

        System.out.println(" Bought " + quantity + " shares of " + stock.name);
    }

    public void sellStock(Stock stock, int quantity) {
        int owned = holdings.getOrDefault(stock.name, 0);

        if (quantity > owned) {
            System.out.println(" Not enough shares!");
            return;
        }

        balance += stock.price * quantity;
        holdings.put(stock.name, owned - quantity);

        System.out.println(" Sold " + quantity + " shares of " + stock.name);
    }

    public void showPortfolio(HashMap<String, Stock> market) {
        System.out.println("\n===== PORTFOLIO =====");

        double totalValue = balance;

        for (String name : holdings.keySet()) {
            int qty = holdings.get(name);
            double price = market.get(name).price;
            double value = qty * price;

            totalValue += value;

            System.out.println(name + " → " + qty + " shares | Value: " + value);
        }

        System.out.println("Cash Balance: " + balance);
        System.out.println("Total Portfolio Value: " + totalValue + "\n");
    }
}