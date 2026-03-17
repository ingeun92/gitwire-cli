import axios, { AxiosInstance, AxiosError } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.GITWIRE_API_URL || 'https://gitwire-core.vercel.app',
  timeout: 10000,
});

export async function fetchAPI<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  try {
    const response = await apiClient.get<T>(path, { params });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      const status = error.response.status;
      const message = (error.response.data as { message?: string })?.message || error.message;
      process.stderr.write(`API 오류 [${status}]: ${message}\n`);
    } else if (error.request) {
      process.stderr.write(`네트워크 오류: 서버에 연결할 수 없습니다. GITWIRE_API_URL을 확인하세요.\n`);
    } else {
      process.stderr.write(`오류: ${error.message}\n`);
    }
    process.exit(1);
  }
}
