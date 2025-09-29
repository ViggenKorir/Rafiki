import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="border-t-blue-600" />
        <h2 className="mt-4 text-sm font-medium text-gray-600">Loading...</h2>
      </div>
    </div>
  );
}
