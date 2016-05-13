import * as React from 'react';

interface IBulletLogoProps {
    size: string
}

const styles = require('./bullet_logo.styl');

function logoClass(size) {
    switch (size) {
        case 'large': return styles.logoLarge;
        case 'small': return styles.logoSmall;
        default: return styles.logoLarge;
    }
}

export function BulletLogo({ size }: IBulletLogoProps) {
    return (
        <a href="/home" className={logoClass(size)}>
            <span className={styles.dot}>.</span>bullet
        </a>
    );
}