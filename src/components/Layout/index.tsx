import { Header } from 'components/Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}