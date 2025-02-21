import React, { useState } from "react";

export default function UserNewsletter() {
  const [isSubscribed, setIsSubscribed] = useState(true); // Example: User is subscribed
  const userEmail = "user@example.com"; // Example email
  const subscriptionDate = "2024-01-15"; // Example date

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
    // Here, you can add an API call to update the subscription status in the backend
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
