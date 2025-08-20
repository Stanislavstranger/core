import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceItem } from './service-item';

describe('ServiceItem', () => {
  it('calls onDeleteAction on click', async () => {
    const onDeleteAction = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <ServiceItem
        service={{ id: '1', name: 'test', description: 'test' }}
        onDeleteAction={onDeleteAction}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Удалить' }));
    expect(onDeleteAction).toHaveBeenCalledTimes(1);
  });

  it('disables button while deletion is in progress', async () => {
    let resolve!: () => void;
    const onDeleteAction = jest.fn().mockImplementation(
      () =>
        new Promise<void>((r) => {
          resolve = r;
        }),
    );
    const user = userEvent.setup();

    render(
      <ServiceItem
        service={{ id: '1', name: 'test', description: 'test' }}
        onDeleteAction={onDeleteAction}
      />,
    );

    const btn = screen.getByRole('button', { name: 'Удалить' });
    await user.click(btn);

    expect(onDeleteAction).toHaveBeenCalledTimes(1);
    expect(btn).toBeDisabled();

    resolve();
    await waitFor(() => expect(btn).not.toBeDisabled());
  });
});
