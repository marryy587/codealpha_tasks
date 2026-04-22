import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        // Market data
        HashMap<String, Stock> market = new HashMap<>();
        market.put("AAPL", new Stock("AAPL", 150));
        market.put("GOOG", new Stock("GOOG", 2800));
        market.put("TSLA", new Stock("TSLA", 700));

        Portfolio portfolio = new Portfolio();

        while (true) {
            System.out.println("===== STOCK TRADING PLATFORM =====");
            System.out.println("1. View Market");
            System.out.println("2. Buy Stock");
            System.out.println("3. Sell Stock");
            System.out.println("4. View Portfolio");
            System.out.println("5. Exit");
            System.out.print("Choose: ");

            int choice = input.nextInt();

            switch (choice) {

                case 1:
                    System.out.println("\n--- Market Data ---");
                    for (Stock s : market.values()) {
                        System.out.println(s.name + " : $" + s.price);
                    }
                    System.out.println();
                    break;

                case 2:
                    System.out.print("Enter stock name: ");
                    String buyName = input.next().toUpperCase();

                    if (!market.containsKey(buyName)) {
                        System.out.println(" Stock not found!\n");
                        break;
                    }

                    System.out.print("Enter quantity: ");
                    int buyQty = input.nextInt();

                    portfolio.buyStock(market.get(buyName), buyQty);
                    break;

                case 3:
                    System.out.print("Enter stock name: ");
                    String sellName = input.next().toUpperCase();

                    if (!market.containsKey(sellName)) {
                        System.out.println(" Stock not found!\n");
                        break;
                    }

                    System.out.print("Enter quantity: ");
                    int sellQty = input.nextInt();

                    portfolio.sellStock(market.get(sellName), sellQty);
                    break;

                case 4:
                    portfolio.showPortfolio(market);
                    break;

                case 5:
                    System.out.println("Exiting...");
                    input.close();
                    return;

                default:
                    System.out.println("Invalid choice!\n");
            }
        }
    }
}