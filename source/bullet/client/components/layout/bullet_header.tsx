import * as React from 'react';

import {BulletLogo} from './bullet_logo';

const styles = require('./bullet_header.styl');

export interface IBulletHeaderProps {
    size: string
}

export function BulletHeader({ size }: IBulletHeaderProps) {
    return (
        <header className={styles.header}>
            <BulletLogo size={size} />
        </header>
    );
}