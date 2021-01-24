import React from 'react';
import PropTypes from 'prop-types';
import Mapa from 'components/Mapa';
import Wrapper from 'components/Wrapper';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/modal/slice';
import { CommentSelectors, PlanSelectors, UserSelectors } from 'redux/selectors';
import { Header } from './containers';
import Footer from 'components/Footer';
import * as SC from './style';

const Template = ({ 
	setCommentState,
	children,
	match,
	subscriptionHandler,
	newCommentViewHandler,
	isFavPlan
}) => {
	const { comments } = CommentSelectors();
	const { planData: { geom } } = PlanSelectors();
	const isPlanHaveComments = comments.length > 0;

	const { isAuthenticated } = UserSelectors();
	const dispatch = useDispatch();
	
	return (
	    <Wrapper hideFooter={true}>
			<SC.MainWrapper>
				<SC.Content>
					<Header
						newCommentViewHandler={newCommentViewHandler}
						subscriptionHandler={subscriptionHandler}
						isFavPlan={isFavPlan}
						openNewCommentView={() => isAuthenticated ? setCommentState(pv => ({ ...pv, isOpen: true })) : dispatch(openModal({ modalType: 'login' }))}
						match={match}
					/>
					<SC.Main className={!isPlanHaveComments ? 'no-comments' : ''}>
						{children}
					</SC.Main>
					<Footer/>
				</SC.Content>
				  <Mapa
					geom={geom}
					hideZoom={false}
					disableInteractions={false}
				/>
			</SC.MainWrapper>
		</Wrapper>
	);
};

Template.propTypes = {
	newCommentViewHandler: PropTypes.func.isRequired,
	setCommentState: PropTypes.func.isRequired,
	subscriptionHandler: PropTypes.func.isRequired,
	isFavPlan: PropTypes.bool.isRequired,
	children: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default Template;