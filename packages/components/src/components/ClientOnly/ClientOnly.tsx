import React from "react";
import { useHasMounted } from "../../utils";

// Big thanks to -> https://www.joshwcomeau.com/react/the-perils-of-rehydration/

export type Props = {
  defaultMounted?: boolean;
};

const ClientOnly: React.FC<Props> = ({ defaultMounted = false, children }) => {
  // const [hasMounted, setHasMounted] = useState(defaultMounted);
  const [hasMounted] = useHasMounted(defaultMounted);

  if (!hasMounted) return null;

  return <>{children}</>;
};

ClientOnly.displayName = "ClientOnly";

export default ClientOnly;
