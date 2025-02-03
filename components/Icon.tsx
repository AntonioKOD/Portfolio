'use client'

import React, {memo} from 'react'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
    name: string
}
const Icon = memo(({name, ...props}: IconProps) => {
    const IconComponent = dynamic(async () => {
        const module = await import('lucide-react');
        return (module as any)[name] || module['Code2'];
    }) as React.ComponentType<LucideProps>;
    
    return <IconComponent {...props}/>
}
)

Icon.displayName = 'Icon'

export default Icon

