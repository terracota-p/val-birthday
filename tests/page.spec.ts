import { expect, test } from '@playwright/test';

test('should celebrate', async ({ page }) => {
	await page.goto('/');

	await page.getByTestId('celebrate').click();

	await expect(page.getByTestId('key')).toBeVisible();
});

test('should generate key with non-empty knowledge', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();

	await page.getByTestId('generate').click();

	await expect(page.getByTestId('key')).not.toBeEmpty();
	const knowledgeTextarea = page.getByTestId('knowledge');
	await expect(knowledgeTextarea).toBeVisible();
	await expect(knowledgeTextarea).not.toBeEmpty();
});

test('should not give knowledge with wrong key', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();
	await page.getByTestId('generate').click();

	const keyInput = page.getByTestId('key');
	await keyInput.fill('wrong-key');

	await expect(page.getByTestId('knowledge')).toBeHidden();
});

test('should not hide key input with empty key', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();
	const keyInput = page.getByTestId('key');
	await keyInput.fill('wrong-key');
	await expect(keyInput).toBeVisible();

	await keyInput.fill('');

	await expect(keyInput).toBeVisible();
});

test('should save and retrieve knowledge', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('celebrate').click();
	await page.getByTestId('generate').click();

	const keyInput = page.getByTestId('key');
	const generatedKey = await keyInput.inputValue();
	const knowledge = 'All my knowledge';
	const knowledgeTextarea = page.getByTestId('knowledge');
	await knowledgeTextarea.fill(knowledge);
	await page.getByTestId('save').click();

	await keyInput.fill('wrong-key');
	await expect(knowledgeTextarea).toBeHidden();

	await keyInput.fill(generatedKey);
	await expect(knowledgeTextarea).toBeVisible();
	await expect(knowledgeTextarea).toHaveValue(knowledge);
});
