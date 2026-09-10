"use client";

import { demoOrders } from "@/data/entretien";
import { getProduct } from "@/data/products";
import type { VendorId } from "@/data/vendors";
import { getVehicle } from "@/data/vehicles";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "autoxpert-v1";

export type GarageVehicle = {
  id: string;
  fitmentId: string;
  vin: string;
  nickname?: string;
};

export type EntretienEntry = {
  id: string;
  vehicleId: string;
  typeId: string;
  date: string;
  km: number;
  note: string;
};

export type CartItem = {
  productId: string;
  vendorId: VendorId;
  qty: number;
};

export type FavoriteId = string;

export type OrderStatus = "processing" | "shipped" | "delivered";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  productId: string;
  vendorId: VendorId;
  qty: number;
  total: number;
};

type StoreState = {
  selectedFitmentId: string | null;
  garage: GarageVehicle[];
  selectedGarageId: string | null;
  entretien: EntretienEntry[];
  cart: CartItem[];
  favorites: FavoriteId[];
  orders: Order[];
  portalOpen: boolean;
};

const seedGarage: GarageVehicle[] = [
  {
    id: "gv-civic",
    fitmentId: "honda-civic-2018-15t",
    vin: "2HGFC1F37JH123456",
  },
  {
    id: "gv-f150",
    fitmentId: "ford-f150-2021-35",
    vin: "1FTFW1E85MFA12345",
  },
  {
    id: "gv-rav4",
    fitmentId: "toyota-rav4-2018-25",
    vin: "2T3BFREV1JW345678",
  },
];

const seedEntretien: EntretienEntry[] = [
  {
    id: "e1",
    vehicleId: "gv-civic",
    typeId: "oil",
    date: "2024-05-15",
    km: 82100,
    note: "Huile synthétique 0W-20",
  },
  {
    id: "e2",
    vehicleId: "gv-civic",
    typeId: "cabin-filter",
    date: "2023-11-02",
    km: 74500,
    note: "Rotation et équilibrage inclus",
  },
  {
    id: "e3",
    vehicleId: "gv-civic",
    typeId: "brakes",
    date: "2023-09-22",
    km: 69100,
    note: "Plaquettes avant",
  },
];

const initialState: StoreState = {
  selectedFitmentId: "honda-civic-2018-15t",
  garage: seedGarage,
  selectedGarageId: "gv-civic",
  entretien: seedEntretien,
  cart: [],
  favorites: [],
  orders: demoOrders,
  portalOpen: false,
};

type StoreContextValue = StoreState & {
  hydrated: boolean;
  setSelectedFitment: (id: string | null) => void;
  addGarageVehicle: (fitmentId: string, vin: string) => void;
  removeGarageVehicle: (id: string) => void;
  setSelectedGarage: (id: string) => void;
  addEntretien: (entry: Omit<EntretienEntry, "id">) => void;
  removeEntretien: (id: string) => void;
  addToCart: (productId: string, vendorId: VendorId, qty?: number) => void;
  updateCartQty: (productId: string, vendorId: VendorId, qty: number) => void;
  removeFromCart: (productId: string, vendorId: VendorId) => void;
  toggleFavorite: (productId: string) => void;
  openPortal: () => void;
  closePortal: () => void;
  cartCount: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): StoreState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const setSelectedFitment = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedFitmentId: id }));
  }, []);

  const addGarageVehicle = useCallback((fitmentId: string, vin: string) => {
    const vehicle = getVehicle(fitmentId);
    if (!vehicle) return;
    const id = `gv-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      garage: [...prev.garage, { id, fitmentId, vin }],
      selectedGarageId: id,
      selectedFitmentId: fitmentId,
    }));
  }, []);

  const removeGarageVehicle = useCallback((id: string) => {
    setState((prev) => {
      const garage = prev.garage.filter((v) => v.id !== id);
      const selectedGarageId =
        prev.selectedGarageId === id ? (garage[0]?.id ?? null) : prev.selectedGarageId;
      return {
        ...prev,
        garage,
        selectedGarageId,
        entretien: prev.entretien.filter((entry) => entry.vehicleId !== id),
      };
    });
  }, []);

  const setSelectedGarage = useCallback((id: string) => {
    setState((prev) => {
      const current = prev.garage.find((v) => v.id === id);
      return {
        ...prev,
        selectedGarageId: id,
        selectedFitmentId: current?.fitmentId ?? prev.selectedFitmentId,
      };
    });
  }, []);

  const addEntretien = useCallback((entry: Omit<EntretienEntry, "id">) => {
    setState((prev) => ({
      ...prev,
      entretien: [
        { ...entry, id: `e-${Date.now()}` },
        ...prev.entretien,
      ],
    }));
  }, []);

  const removeEntretien = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      entretien: prev.entretien.filter((entry) => entry.id !== id),
    }));
  }, []);

  const addToCart = useCallback((productId: string, vendorId: VendorId, qty = 1) => {
    if (!getProduct(productId)) return;
    setState((prev) => {
      const existing = prev.cart.find(
        (item) => item.productId === productId && item.vendorId === vendorId,
      );
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((item) =>
            item.productId === productId && item.vendorId === vendorId
              ? { ...item, qty: item.qty + qty }
              : item,
          ),
        };
      }
      return { ...prev, cart: [...prev.cart, { productId, vendorId, qty }] };
    });
  }, []);

  const updateCartQty = useCallback((productId: string, vendorId: VendorId, qty: number) => {
    setState((prev) => ({
      ...prev,
      cart:
        qty < 1
          ? prev.cart.filter((item) => !(item.productId === productId && item.vendorId === vendorId))
          : prev.cart.map((item) =>
              item.productId === productId && item.vendorId === vendorId ? { ...item, qty } : item,
            ),
    }));
  }, []);

  const removeFromCart = useCallback((productId: string, vendorId: VendorId) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => !(item.productId === productId && item.vendorId === vendorId)),
    }));
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId],
    }));
  }, []);

  const openPortal = useCallback(() => {
    setState((prev) => ({ ...prev, portalOpen: true }));
  }, []);

  const closePortal = useCallback(() => {
    setState((prev) => ({ ...prev, portalOpen: false }));
  }, []);

  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.qty, 0),
    [state.cart],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      hydrated,
      setSelectedFitment,
      addGarageVehicle,
      removeGarageVehicle,
      setSelectedGarage,
      addEntretien,
      removeEntretien,
      addToCart,
      updateCartQty,
      removeFromCart,
      toggleFavorite,
      openPortal,
      closePortal,
      cartCount,
    }),
    [
      state,
      hydrated,
      setSelectedFitment,
      addGarageVehicle,
      removeGarageVehicle,
      setSelectedGarage,
      addEntretien,
      removeEntretien,
      addToCart,
      updateCartQty,
      removeFromCart,
      toggleFavorite,
      openPortal,
      closePortal,
      cartCount,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
