# PDF Ignova Pro — Payment and support-license setup

## Selected model

- Product: **PDF Ignova Pro — Licencia de apoyo permanente**
- Price: **12 EUR**
- Billing: **one-time payment**
- Subscription: **none**
- Intended activation limit: **1 computer**
- License duration: **perpetual**
- Software remains functional without payment.
- The support license suppresses the monthly support reminder in the official distribution.

## Merchant of Record

Planned provider: **Lemon Squeezy**.

The website is already prepared. The only missing public-web value is the final Lemon Squeezy checkout URL in `docs/payments.js`.

## Lemon Squeezy dashboard setup

1. Create the Lemon Squeezy store/account and complete seller verification.
2. Create a product named `PDF Ignova Pro — Licencia de apoyo permanente`.
3. Configure the default variant as a **single payment** of **12 EUR**.
4. Enable **Generate license keys**.
5. Configure the key as **perpetual** / no expiration.
6. Configure **activation limit = 1**.
7. Publish the product.
8. Copy the hosted checkout URL.
9. Edit `docs/payments.js` and set:

```js
checkoutUrl: 'PASTE_LEMON_SQUEEZY_CHECKOUT_URL_HERE'
```

## Post-purchase redirect

Configure the product confirmation button/link to return to:

`https://jirivas.github.io/pdf-ignova-pro/pago-completado.html?license=[license_key]`

Lemon Squeezy supports inserting the generated license key into post-order URLs using its license-key link variable.

The customer will also receive the generated license key in the order receipt.

## Application activation flow

The official PDF Ignova Pro build should:

1. Ask the user for the support license key.
2. POST the key to the Lemon Squeezy License API activation endpoint.
3. Use a stable local machine/installation label as the instance name.
4. Store the returned instance ID locally after successful activation.
5. Validate the license when appropriate, without making normal PDF use dependent on continuous network access.
6. If the support license is valid, suppress the monthly support reminder.
7. If the license cannot be validated temporarily because the machine is offline, do not block PDF functionality.

## GPL note

The support-license mechanism must not remove or restrict GPL rights in the Open Source code. Its role is limited to the official distribution experience (for example, suppressing the optional support reminder).

## Hardware changes

If a legitimate purchaser replaces or reinstalls a computer and reaches the activation limit, support can reset/deactivate the previous instance after verifying the purchase.
