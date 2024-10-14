"use client"

import { FC } from "react"
import { Oval } from "react-loader-spinner"
import LoadingSpinnerTypes from "./types/LoadingSpinner.interface"

const LoadingSpinner: FC<LoadingSpinnerTypes> = ({ height, width, styles = {}, wrapperClass = "" }) => (
  <Oval
    height={height}
    width={width}
    color="#E64833"
    wrapperStyle={styles}
    wrapperClass={wrapperClass}
    visible
    ariaLabel="oval-loading"
    secondaryColor="#E64833"
    strokeWidth={7}
    strokeWidthSecondary={7}
  />
)

export default LoadingSpinner
