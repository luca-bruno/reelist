import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"

const loading = () => (
  <div className="flex justify-center">
    <LoadingSpinner
      width={30}
      height={30}
      styles={{
        opacity: "50%",
        height: "100vh",
        alignItems: "center"
      }}
    />
  </div>
)

export default loading
