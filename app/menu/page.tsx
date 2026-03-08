import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Fancy Bagels | Breakfast & Lunch in Southington, CT",
  description:
    "Explore our menu of fresh NY-style bagels, breakfast sandwiches, lunch wraps, deli options, and specialty coffee at Fancy Bagels in Southington, CT.",
};

const menuCategories = [
  {
    title: "Breakfast Sandwiches",
    description: "Start your day the Fancy way",
    items: [
      { name: "The Classic", description: "Bacon, egg & cheese on your choice of bagel", price: "$6.99" },
      { name: "Sausage, Egg & Cheese", description: "Savory sausage patty with egg and melted cheese", price: "$7.49" },
      { name: "Western Omelette", description: "Ham, peppers, onions, egg & cheese", price: "$7.99" },
      { name: "Veggie Delight", description: "Egg whites, spinach, tomato, avocado & Swiss", price: "$7.99" },
      { name: "The Fancy Special", description: "Taylor ham, egg, cheese with hash browns on a everything bagel", price: "$8.99" },
    ],
  },
  {
    title: "NY Style Bagels & Spreads",
    description: "Authentic, kettle-boiled perfection",
    items: [
      { name: "Plain Bagel", description: "Classic and simple", price: "$1.99" },
      { name: "Everything Bagel", description: "Sesame, poppy, garlic, onion, salt", price: "$1.99" },
      { name: "Sesame Bagel", description: "Topped with toasted sesame seeds", price: "$1.99" },
      { name: "Cinnamon Raisin", description: "Sweet and satisfying", price: "$2.29" },
      { name: "Cream Cheese (Plain)", description: "House-whipped, generous portion", price: "$1.50" },
      { name: "Veggie Cream Cheese", description: "Loaded with fresh vegetables", price: "$2.00" },
      { name: "Lox Spread", description: "Premium smoked salmon cream cheese", price: "$2.50" },
    ],
  },
  {
    title: "Lunch Wraps & Deli",
    description: "Fresh and filling options",
    items: [
      { name: "Turkey Club Wrap", description: "Turkey, bacon, lettuce, tomato, mayo", price: "$9.99" },
      { name: "Italian Sub", description: "Ham, salami, capicola, provolone, oil & vinegar", price: "$10.99" },
      { name: "Chicken Caesar Wrap", description: "Grilled chicken, romaine, parmesan, Caesar dressing", price: "$9.99" },
      { name: "BLT Deluxe", description: "Extra bacon, lettuce, tomato, mayo on toast", price: "$8.99" },
      { name: "Tuna Melt", description: "House-made tuna salad with melted cheddar", price: "$8.99" },
    ],
  },
  {
    title: "Coffee & Beverages",
    description: "Handcrafted drinks",
    items: [
      { name: "Drip Coffee", description: "Fresh brewed, locally roasted", price: "$2.49" },
      { name: "Latte", description: "Espresso with steamed milk", price: "$4.49" },
      { name: "Cappuccino", description: "Espresso with foamed milk", price: "$4.49" },
      { name: "Cold Brew", description: "Smooth, 24-hour steeped", price: "$3.99" },
      { name: "Fresh OJ", description: "Squeezed daily", price: "$3.49" },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Menu</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Fresh bagels, hearty sandwiches, and specialty coffee
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          {menuCategories.map((category, idx) => (
            <div key={category.title} className={idx > 0 ? "mt-12 md:mt-16" : ""}>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  {category.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{category.description}</p>
                <div className="flex items-center justify-center mt-4">
                  <div className="h-px w-12 bg-primary" />
                  <div className="size-2 bg-primary rotate-45 mx-2" />
                  <div className="h-px w-12 bg-primary" />
                </div>
              </div>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 border-b border-border/50 pb-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="font-semibold text-primary whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="bg-secondary py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-muted-foreground">
            Prices and menu items subject to change. Please inform us of any allergies.
            Gluten-free options available upon request.
          </p>
        </div>
      </section>
    </div>
  );
}
