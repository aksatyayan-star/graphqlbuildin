import logo from './assets/buildinlogo.jpeg';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className="navbar-brand" href='/'>
                <div className="d-flex">
                    <img src={logo} alt="logo" className="mr-2" />
                    <div>graphqlbuildin</div>
                </div>
            </a> {/*when we will use react router dom, will use link tag instead of <a> tag*/}
        </div>
    </nav>
  )
}
