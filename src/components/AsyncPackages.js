import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPackages } from '../utils/fetchPackages';

const AsyncPackages = ({ packages, children: Children }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [retrievedPackages, setRetrievedPackages] = useState({});

  const getPackages = useCallback(() => fetchPackages(packages), [packages]);

  useEffect(() => {
    getPackages().then((loadedPackages) => {
      setRetrievedPackages(loadedPackages);
      setIsLoaded(true);
    });
  }, [packages, getPackages]);

  return isLoaded ? <Children {...retrievedPackages} /> : null;
};

export default AsyncPackages;

AsyncPackages.propTypes = {
  packages: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.func.isRequired,
};
