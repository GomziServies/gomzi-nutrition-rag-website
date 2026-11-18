import React from "react";
import CertificationsBar from "./CertificationsBar";

/**
 * Replaces the legacy black strip with the clean white 13-badge Certifications Bar.
 * Exported under BlackFeatureBar to preserve backwards compatibility across existing routes.
 */
const BlackFeatureBar = (props) => {
  return <CertificationsBar {...props} />;
};

export default BlackFeatureBar;
