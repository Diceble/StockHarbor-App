import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || "https://your-dotnet-api.com";
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const session = await getServerSession(authOptions);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return headers;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T, TData>(
    endpoint: string,
    data?: TData,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T, TData>(
    endpoint: string,
    data?: TData,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const authHeaders = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
      // Add caching strategy based on your needs
      cache: options.cache || "no-store",
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new ApiError(
          `API Error: ${response.status} - ${errorMessage}`,
          response.status,
          response
        );
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return (await response.text()) as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Network error: ${error}`, 500);
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
