interface Props {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
    </header>
  );
}

export default Header;
