"use client";

import { usePathname, useRouter } from "next/navigation";
import { MoveLeftIcon } from "lucide-react";

import styles from "@/components/navigation-bar/navigation-bar.module.css";

export function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const BASE_URL = "/category";

  if (pathname === BASE_URL) {
    return null;
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.navigationBar}>
      <div data-testid="navigation-bar" onClick={handleGoBack} className={styles.navigationButton}>
        <MoveLeftIcon className={styles.backIcon} size={24} overlineThickness="1" />
        <span className={styles.navigationText}>Go Back</span>
      </div>
    </div>
  );
}
