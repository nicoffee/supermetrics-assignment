import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Auth from './Auth';

test('renders auth modal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Auth />
    </Provider>
  );

  expect(getByText(/email/i)).toBeInTheDocument();
});
