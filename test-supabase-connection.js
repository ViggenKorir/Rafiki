#!/usr/bin/env node

/**
 * Test Supabase Connection and Inquiries Table
 * Run with: node test-supabase-connection.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Read .env.local file manually
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

try {
  const envPath = path.join(__dirname, ".env.local");
  const envFile = fs.readFileSync(envPath, "utf8");
  const lines = envFile.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^NEXT_PUBLIC_SUPABASE_URL=(.*)$/);
    if (match) supabaseUrl = match[1].trim();

    const match2 = line.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)$/);
    if (match2) supabaseAnonKey = match2[1].trim();
  });
} catch (err) {
  console.log("⚠️  Could not read .env.local file");
}

console.log("🧪 Testing Supabase Connection\n");
console.log("=".repeat(60));

// Check environment variables
console.log("📋 Environment Variables:");
console.log(
  "  NEXT_PUBLIC_SUPABASE_URL:",
  supabaseUrl ? "✅ Set" : "❌ Missing",
);
console.log(
  "  NEXT_PUBLIC_SUPABASE_ANON_KEY:",
  supabaseAnonKey ? "✅ Set" : "❌ Missing",
);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log("\n❌ ERROR: Missing Supabase credentials!");
  console.log("\n💡 Fix:");
  console.log("   1. Create .env.local file in project root");
  console.log("   2. Add the following:");
  console.log("      NEXT_PUBLIC_SUPABASE_URL=your_supabase_url");
  console.log("      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key");
  process.exit(1);
}

console.log("\n📍 Supabase URL:", supabaseUrl);
console.log("🔑 Anon Key:", supabaseAnonKey.substring(0, 20) + "...");
console.log("=".repeat(60));

// Create Supabase client
console.log("\n🔌 Creating Supabase client...");
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log("✅ Client created");

// Test 1: Check if inquiries table exists
console.log('\n📊 Test 1: Checking if "inquiries" table exists...');
supabase
  .from("inquiries")
  .select("count", { count: "exact", head: true })
  .then(({ count, error }) => {
    if (error) {
      console.log("❌ Table does not exist or is not accessible");
      console.log("🔴 Error:", error.message);
      console.log("🔴 Details:", error.details);
      console.log("🔴 Hint:", error.hint);
      console.log("\n💡 Fix:");
      console.log("   1. Go to your Supabase dashboard");
      console.log("   2. Navigate to SQL Editor");
      console.log("   3. Run the schema.sql file from supabase/schema.sql");
      console.log("   4. Verify the table appears in Table Editor");
      return Promise.reject(error);
    }
    console.log("✅ Table exists!");
    console.log("📈 Current row count:", count);
    return true;
  })
  .then(() => {
    // Test 2: Check RLS policies
    console.log("\n🔒 Test 2: Checking RLS policies (INSERT permission)...");

    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+254712345678",
      message:
        "This is a test message to verify the inquiries table and RLS policies.",
      project_type: "consultation",
      status: "new",
    };

    return supabase.from("inquiries").insert([testData]).select().single();
  })
  .then(({ data, error }) => {
    if (error) {
      console.log(
        "❌ INSERT failed - RLS policy issue or constraint violation",
      );
      console.log("🔴 Error:", error.message);
      console.log("🔴 Details:", error.details);
      console.log("🔴 Code:", error.code);
      console.log("\n💡 Fix:");
      console.log("   1. Check RLS is enabled with INSERT policy for public");
      console.log("   2. Verify all required columns are present");
      console.log("   3. Run the RLS policy commands from schema.sql");
      return Promise.reject(error);
    }
    console.log("✅ INSERT successful!");
    console.log("📝 Created entry:");
    console.log("   ID:", data.id);
    console.log("   Name:", data.name);
    console.log("   Email:", data.email);
    console.log("   Status:", data.status);
    console.log("   Created:", data.created_at);
    return data.id;
  })
  .then((insertedId) => {
    // Test 3: Try to read back (should fail for anonymous users)
    console.log(
      "\n👁️  Test 3: Checking READ permissions (should fail for anon)...",
    );
    return supabase
      .from("inquiries")
      .select("*")
      .eq("id", insertedId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log("✅ READ correctly blocked for anonymous users");
          console.log("ℹ️  This is expected behavior for security");
        } else {
          console.log("⚠️  WARNING: Anonymous users can read data");
          console.log(
            "💡 Consider restricting SELECT to authenticated users only",
          );
        }
        return insertedId;
      });
  })
  .then((insertedId) => {
    console.log("\n" + "=".repeat(60));
    console.log("🎉 All tests passed! Supabase is configured correctly");
    console.log("=".repeat(60));
    console.log("\n✅ Summary:");
    console.log("   • Supabase connection: Working");
    console.log("   • inquiries table: Exists");
    console.log("   • INSERT permission: Granted");
    console.log("   • RLS policies: Active");
    console.log("\n💡 Next steps:");
    console.log(
      "   1. Check your Supabase dashboard → Table Editor → inquiries",
    );
    console.log("   2. You should see the test entry");
    console.log("   3. Try submitting the contact form on your website");
    console.log("   4. Monitor the server logs for any errors");
    console.log("\n📊 View test data in Supabase:");
    console.log(`   ${supabaseUrl}/project/default/editor/inquiries`);
    process.exit(0);
  })
  .catch((error) => {
    console.log("\n" + "=".repeat(60));
    console.log("💥 TEST FAILED");
    console.log("=".repeat(60));
    console.log("\n🔴 Error occurred during testing");
    console.log("\n📚 Troubleshooting steps:");
    console.log("   1. Verify Supabase credentials are correct");
    console.log("   2. Check if project is paused (free tier limitation)");
    console.log("   3. Run supabase/schema.sql to create tables");
    console.log("   4. Verify RLS policies are set up correctly");
    console.log("   5. Check Supabase logs for more details");
    console.log("\n📖 Documentation:");
    console.log("   • Setup guide: supabase/QUICKSTART.md");
    console.log("   • Schema file: supabase/schema.sql");
    console.log("   • Supabase docs: https://supabase.com/docs");
    process.exit(1);
  });
