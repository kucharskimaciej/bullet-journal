export function BulletLayout({ children }) {
    return <div>
        <header>Hello header!</header>
        <section role='main'>{children}</section>
    </div>;
}