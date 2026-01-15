import * as Sentry from "@sentry/react";
import type { ReactNode } from "react";

interface FallbackProps {
  error: unknown;
  resetError: () => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

function ErrorFallback({ error, resetError }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 mb-4">
          申し訳ありません。予期しないエラーが発生しました。
        </p>
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-gray-500">
            詳細情報
          </summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {getErrorMessage(error)}
          </pre>
        </details>
        <button
          type="button"
          onClick={resetError}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error} resetError={resetError} />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
