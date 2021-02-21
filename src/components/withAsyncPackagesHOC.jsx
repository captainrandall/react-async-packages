import React, { useEffect, useCallback } from 'react';
import { fetchPackages } from '../utils/fetchPackages';

/**
 * Provide the requested packages to a given component via it's props.
 *
 * @param {string[]} packages - reference labels of packages to load.
 * @param {function} WrappedComponent - Component of which the loaded packages are provided to.
 */
export const withAsyncPackages = (packages, WrappedComponent) => {
  const WithPackages = () => {
    const [retrievedPackages, setRetrievedPackages] = React.useState({});

    const getPackages = useCallback(() => fetchPackages(packages), [packages]);

    useEffect(() => {
      getPackages().then((loadedPackages) => {
        setRetrievedPackages(loadedPackages);
      });
    }, [packages, getPackages]);

    return <WrappedComponent {...retrievedPackages} />;
  };

  return WithPackages;
};

export default withAsyncPackages;
