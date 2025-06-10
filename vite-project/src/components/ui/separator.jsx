import * as React from 'react';
import { cn } from '../../utils/lib';

export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            aria-hidden={decorative}
            className={cn(
                'shrink-0 bg-border',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
            {...props}
        />
    );
}