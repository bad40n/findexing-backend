import { User } from "../modules/User/user.model";
import { Transaction } from "../modules/Transaction/transaction.model";
import { Budget } from "../modules/Budget/budget.model";

export async function seedDatabase() {
  try {
    // Check if Rahim exists
    const userEmail = "rahim@example.com";
    let rahim = await User.findOne({ email: userEmail });

    if (!rahim) {
      console.log("Seeding default user Rahim...");
      rahim = await User.create({
        name: "Rahim Uddin",
        email: userEmail,
        pass: "password", // pre-save hook will hash this
        currency: "BDT",
        type: "user",
        isActive: true,
      });

      console.log("Seeding default transactions for Rahim...");
      const userId = rahim._id;
      const now = new Date();

      const daysAgo = (n: number) => {
        const d = new Date();
        d.setDate(d.getDate() - n);
        return d;
      };

      await Transaction.create([
        { userId, type: "expense", amount: 350, category: "food", title: "Lunch at Restaurant", note: "With colleagues", date: daysAgo(0), currency: "BDT" },
        { userId, type: "expense", amount: 120, category: "transport", title: "CNG Fare", date: daysAgo(0), currency: "BDT" },
        { userId, type: "income", amount: 50000, category: "salary", title: "Monthly Salary", note: "March salary", date: daysAgo(0), currency: "BDT" },
        { userId, type: "expense", amount: 2500, category: "shopping", title: "Clothing Purchase", note: "New shirt & pants", date: daysAgo(1), currency: "BDT" },
        { userId, type: "expense", amount: 800, category: "groceries", title: "Superstore Shopping", date: daysAgo(1), currency: "BDT" },
        { userId, type: "expense", amount: 250, category: "entertainment", title: "Netflix Subscription", date: daysAgo(1), currency: "BDT" },
        { userId, type: "income", amount: 8500, category: "freelance", title: "Website Project", note: "Landing page design", date: daysAgo(2), currency: "BDT" },
        { userId, type: "expense", amount: 450, category: "food", title: "Dinner - KFC", date: daysAgo(2), currency: "BDT" },
        { userId, type: "expense", amount: 1200, category: "bills", title: "Internet Bill", date: daysAgo(3), currency: "BDT" },
        { userId, type: "expense", amount: 600, category: "health", title: "Pharmacy", note: "Cold medicine", date: daysAgo(3), currency: "BDT" },
        { userId, type: "expense", amount: 3500, category: "education", title: "Online Course", note: "React Native course", date: daysAgo(5), currency: "BDT" },
        { userId, type: "income", amount: 5000, category: "freelance", title: "Logo Design", date: daysAgo(5), currency: "BDT" },
      ]);

      console.log("Seeding default budgets for Rahim...");
      await Budget.create([
        { userId, categoryId: "food", limit: 5000, period: "monthly" },
        { userId, categoryId: "transport", limit: 2000, period: "monthly" },
        { userId, categoryId: "shopping", limit: 8000, period: "monthly" },
        { userId, categoryId: "entertainment", limit: 1500, period: "monthly" },
        { userId, categoryId: "groceries", limit: 4000, period: "monthly" },
        { userId, categoryId: "health", limit: 3000, period: "monthly" },
        { userId, categoryId: "bills", limit: 6000, period: "monthly" },
      ]);

      console.log("Rahim's account seeded successfully!");
    }

    // Seed Admin User
    const adminCount = await User.countDocuments({ type: "admin" });
    if (adminCount === 0) {
      console.log("Seeding admin user...");
      await User.create({
        name: "Default Admin",
        email: "admin@findexing.com",
        pass: "admin12345",
        currency: "BDT",
        type: "admin",
        isActive: true,
      });
    }

    console.log("Database checks and seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
