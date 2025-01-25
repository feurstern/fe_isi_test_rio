import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user || Object.keys(user).length === 0) {
        router.push("/login"); 
      }
    }, []);

    // Avoid rendering the protected page until authentication check is complete
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user || Object.keys(user).length === 0) {
        return null; 
      }
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
