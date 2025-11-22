// test-home.ts
import dotenv from "dotenv";
// Adjust path if necessary:
import { HomeEngine } from "./game/engines/home-engine"; 

dotenv.config({ path: '.env.local' });

async function main() {
  console.log("🏠 Starting HomeEngine Test...\n");

  const engine = new HomeEngine();

  const wishes = [
    "A cheap student apartment in Munich",
    "A family house with garden in Berlin",
    "Luxury loft in Hamburg"
  ];

  for (const wish of wishes) {
    console.log(`-----------------------------------------`);
    console.log(`Request: "${wish}"`);
    
    try {
        // Call the function
        const options = await engine.handleNewHomeWish(wish);

        // Print results
        if (options.length === 0) {
            console.log("⚠️ No options found.");
        } else {
            console.log(`✅ Generated ${options.length} options:`);
            options.forEach((home, index) => {
                console.log(`   Option ${index + 1}: ${home.sizeInSquareMeter}m² | ${home.yearlyRentInEuro}€/year | ZIP: ${home.zip}`);
            });
        }

    } catch (e) {
        console.error("Error:", e);
    }
  }
}

main();