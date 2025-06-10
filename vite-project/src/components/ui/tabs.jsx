'use client';

import * as React from 'react';
import { Tabs as RadixTabs, TabsList as RadixTabsList, TabsTrigger as RadixTabsTrigger, TabsContent as RadixTabsContent } from '@radix-ui/react-tabs';
import { cn } from '../../utils/lib';

const Tabs = RadixTabs;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <RadixTabsList
        ref={ref}
        className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
            className
        )}
        {...props}
    />
));
TabsList.displayName = RadixTabsList.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
    <RadixTabsTrigger
        ref={ref}
        className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground',
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = RadixTabsTrigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
    <RadixTabsContent
        ref={ref}
        className={cn(
            'mt-2 rounded-md border border-border bg-background p-4',
            className
        )}
        {...props}
    />
));
TabsContent.displayName = RadixTabsContent.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };