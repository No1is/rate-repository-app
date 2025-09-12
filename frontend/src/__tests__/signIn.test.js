import { SignInContainer } from '../components/SignInContainer';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'matti');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'matti',
                    password: 'password',
                });
            });
        });
    });
});