interface CacheEntry {
    value: unknown;
    expiresAt?: number;
}

export class MemoryCache<T> {
    private cache = Object.create(null) as Record<string, CacheEntry>;

    private defaultExpiryMinutes?: number;

    constructor(defaultExpiryMinutes?: number) {
        this.defaultExpiryMinutes = defaultExpiryMinutes;
    }

    /**
     * Get data from cache (only if not expired)
     */
    public get(key: string): T | undefined {
        const entry = this.cache[key];
        if (!entry) return undefined;

        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            this.remove(key);
            return undefined;
        }
        return entry.value as T;
    }

    /**
     * Set data & auto remove after the expiration time
     */
    public set(key: string, value: T, expiryMinutes?: number): void {
        const minutes = expiryMinutes ?? this.defaultExpiryMinutes;
        const expiresAt = minutes ? Date.now() + minutes * 60 * 1000 : undefined;

        this.cache[key] = { value, expiresAt };

        if (expiresAt) {
            const timeoutDuration = expiresAt - Date.now();
            setTimeout(() => {
                this.remove(key);
            }, timeoutDuration - Date.now());
        }
    }

    /**
     * Remove the cache by key
     */
    public remove(key: string): void {
        delete this.cache[key];
    }

    /**
     * Clear all the cache
     */
    public clear(): void {
        this.cache = Object.create(null) as Record<string, CacheEntry>;
    }
}
