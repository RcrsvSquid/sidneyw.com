// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import FormState from './FormState';
import { formFieldStyle, Loader } from '.';

import { LoaderButton } from './Button';

const NewsLetterForm = ({ secondary, endpoint = '/signup ' }) => (
  <StaticQuery
    query={graphql`
      query NewsLetterFormQuery {
        message: file(relativePath: { regex: "/message/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        check: file(relativePath: { regex: "/check/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ check, message }) => (
      <FormState endpoint={endpoint}>
        {({ handleChange, handleSubmit, state }) => (
          <NewsLetter name="email-list" id="email-list" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={state.email}
              name="email"
              type="email"
              placeholder="someone@mail.com"
              required
            />
            <LoaderButton
              loading={{
                icon: <Loader />,
                children: <span>Working on it</span>,
                secondary,
              }}
              normal={{
                icon: message.childImageSharp,
                children: <span>Subscribe</span>,
                secondary,
              }}
              state={state}
              success={{
                icon: check.childImageSharp,
                children: <span>All set!</span>,
                secondary,
              }}
              type="submit"
            />
          </NewsLetter>
        )}
      </FormState>
    )}
  />
);

NewsLetterForm.propTypes = {
  endpoint: PropTypes.string,
  secondary: PropTypes.bool,
};

NewsLetterForm.assets = ['message.png', 'check.png'];

export default NewsLetterForm;

const NewsLetter = styled.form`
  display: flex;
  flex-flow: column;
  width: 90vw;
  max-width: 20rem;
  max-height: 50rem;

  & > button,
  & > input {
    width: 100%;
    height: 6vh !important;
  }

  button {
    padding: 0;
    img {
      height: 100%;
    }
  }

  input {
    ${formFieldStyle};
    margin-bottom: 0.5em;
  }
  //pure-lg
  @media screen and (min-width: 64em) {
    flex-flow: row;
    width: 50vw;
    max-width: 30rem;

    & > * {
      margin-bottom: 0;
    }

    input {
      width: 70%;
      margin-right: 0.5rem;
      text-align: right;
      max-height: 10rem;
    }

    button {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      padding: 0;

      align-items: center;

      & > div {
        display: initial;
      }

      span {
        display: none;
      }
    }
  }
`;
