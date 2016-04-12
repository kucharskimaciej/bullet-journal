import * as React from 'react';

export interface IBulletHeaderProps {
    size: string
}

export function BulletHeader({ size }: IBulletHeaderProps) {
    return (
        <header className={size}>
            <h1>.Bullet</h1>
        </header>
    );
}