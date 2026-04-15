"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import StoreHydration from "./StoreHydration";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Signature Collection",
    href: "/catalog?category=signature",
    description: "Nuestras creaciones más icónicas con aromas botánicos.",
  },
  {
    title: "Pastelería de Temporada",
    href: "/catalog?category=seasonal",
    description: "Ingredientes frescos seleccionados según la estación.",
  },
  {
    title: "Experiencias de Catering",
    href: "/catalog?category=catering",
    description: "Servicio exclusivo para eventos y celebraciones privadas.",
  },
  {
    title: "Cajas de Regalo",
    href: "/catalog?category=gifts",
    description: "Detalles artesanales envueltos en elegancia.",
  },
];

export function MegaMenu() {
  return (
    <StoreHydration>
      <NavigationMenu className="hidden md:flex relative z-50">
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent font-sans font-black text-foreground/80 tracking-[0.3em] text-[9px] uppercase transition-all hover:text-primary">
              Catálogo
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] glass-light border-none shadow-premium animate-in fade-in zoom-in-95 duration-500 rounded-2xl relative z-[70] overflow-hidden">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md group overflow-hidden relative"
                    href="/catalog"
                  >
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="z-10 mb-2 mt-4 font-serif text-2xl font-bold text-primary">
                      Aura Floral
                    </div>
                    <p className="z-10 text-xs leading-tight text-foreground/70">
                      Explora el universo completo de nuestra nueva colección luminosa.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent focus:bg-transparent font-sans font-black text-foreground/80 tracking-[0.3em] text-[9px] uppercase transition-all hover:text-primary")}>
              Nosotros
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </StoreHydration>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-xs font-bold leading-none tracking-widest uppercase mb-1">{title}</div>
          <p className="line-clamp-2 text-[10px] leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
