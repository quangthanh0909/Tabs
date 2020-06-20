import React, { useEffect, useMemo } from 'react';
const TabContent = ({ id }) => {
	useEffect(() => {
		console.log('mount', id);
		return () => {
			console.log('unmout', id);
		};
	}, []);
	const renderElement = useMemo(
		() => {
			console.log('render', id);
			return <div>{id}</div>;
		},
		[ id ]
	);

	return <React.Fragment>{renderElement}</React.Fragment>;
};

export default TabContent;
