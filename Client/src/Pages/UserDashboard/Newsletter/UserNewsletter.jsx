import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import Redux state
import axios from "axios";

export default function UserNewsletter() {
  const userEmail = useSelector((state) => state.user.email); // Get email from Redux
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch subscription status when email is available
  useEffect(() => {
    const fetchSubscriber = async () => {
      if (!userEmail) return; // Skip if no email is available

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/newsletter/subscribers?email=${userEmail}`
        );
        if (response.data && response.data.length > 0) {
          setIsSubscribed(true);
          const subscriber = response.data[0];
          if (subscriber.date) {
            setSubscriptionDate(subscriber.date.split("T")[0]);
          } else {
            console.error("Date is undefined in subscriber data:", subscriber);
          }
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error("Error fetching subscriber:", error);
      }
    };

    fetchSubscriber();
  }, [userEmail]); // Run when userEmail changes

  // Handle subscription toggle
  const toggleSubscription = async () => {
    if (!userEmail) {
      alert("No email found! Please log in.");
      return;
    }

    if (isSubscribed) {
      try {
        await axios.delete(
          `${BACKEND_URL}/api/newsletter/subscribe/${userEmail}`
        );
        setIsSubscribed(false);
        setSubscriptionDate("");
        alert("Successfully unsubscribed");
      } catch (error) {
        console.error("Error unsubscribing:", error);
        alert("Failed to unsubscribe");
      }
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/newsletter/subscribe`,
          { email: userEmail }
        );
        if (response.data.subscriber) {
          setIsSubscribed(true);
          setSubscriptionDate(
            new Date(response.data.subscriber.date).toLocaleDateString()
          );
          alert("Successfully subscribed");
        }
      } catch (error) {
        console.error("Error subscribing:", error);
        alert("Failed to subscribe");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-auto flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Newsletter Subscription
        </h2>

        <div
          className={`mt-4 p-3 rounded-md text-lg font-medium ${
            isSubscribed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isSubscribed ? "You are subscribed! ✅" : "Not subscribed ❌"}
        </div>

        {isSubscribed && (
          <div className="mt-4 text-gray-700 text-sm">
            <p>
              Email: <span className="font-medium">{userEmail}</span>
            </p>
            <p>
              Subscribed on:{" "}
              <span className="font-medium">{subscriptionDate}</span>
            </p>
          </div>
        )}

        <button
          onClick={toggleSubscription}
          className={`mt-6 w-full px-4 py-2 rounded-lg text-white font-medium ${
            isSubscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
}
