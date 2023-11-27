const repository: { [key: string]: string | null } = {
	foo: 'Foo is great',
	bar: 'A bar is a bar'
};

async function set(key: string, knowledge: string | null): Promise<void> {
	repository[key] = knowledge;
}

async function get(key: string): Promise<string | null> {
	return repository[key];
}

export default { get, set };
