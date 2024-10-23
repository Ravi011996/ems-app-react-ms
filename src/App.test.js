// App.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import App from './App';

// Mock the Navbar component
jest.mock('./layouts/Navbar', () => () => <div>Mocked Navbar</div>);

test('renders Navbar and Home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>  {/* Wrap App with MemoryRouter */}
      <App />
    </MemoryRouter>
  );

  const navbarElement = screen.getByText(/Mocked Navbar/i);
  expect(navbarElement).toBeInTheDocument();

  const homeElement = screen.getByText(/Home/i); 
  expect(homeElement).toBeInTheDocument();
});
