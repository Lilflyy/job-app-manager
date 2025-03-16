import { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig/supabase";
import Layout from "../components/Layout";

const DashBoard = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
      } else {
        console.log("User Data:", JSON.stringify(data, null, 2));
        setUser(data.user);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <Layout>
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <h1>Welcome to your Dashboard, {user?.user_metadata?.display_name || "User"}!</h1>
      ) : (
        <p>Please Log in / Sign up first</p>
      )}
    </div>
    </Layout>
  );
};

export default DashBoard;
