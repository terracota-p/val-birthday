import { expect, test } from '@playwright/test';

test('should celebrate', async ({ page }) => {
	await page.goto('/');

	await page.getByTestId('celebrate').click();

	await expect(page.getByTestId('key')).toBeVisible();
});

test('should generate key with empty knowledge', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();

	await page.getByTestId('generate').click();

	await expect(page.getByTestId('key')).not.toBeEmpty();
	await expect(page.getByTestId('knowledge')).toBeVisible();
	await expect(page.getByTestId('knowledge')).toBeEmpty();
});

test('should not give knowledge with wrong key', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();
	await page.getByTestId('generate').click();

	await page.getByTestId('key').fill('wrong-key');

	await expect(page.getByTestId('knowledge')).not.toBeVisible();
});

test('should save and retrieve knowledge', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();
	await page.getByTestId('generate').click();

	const generatedKey = await page.getByTestId('key').inputValue();
	const knowledge = 'All my knowledge';
	await page.getByTestId('knowledge').fill(knowledge);
	await page.getByTestId('save').click();

	await page.getByTestId('key').fill('wrong-key');
	await expect(page.getByTestId('knowledge')).not.toBeVisible();

	await page.getByTestId('key').fill(generatedKey);
	await expect(page.getByTestId('knowledge')).toBeVisible();
	await expect(page.getByTestId('knowledge')).toHaveValue(knowledge);
});
