const fetchAPI = async (query, variables) => {
  try {
    const res = await fetch(`http://cos8s8k8w0oksck0skkgcg40.62.72.13.4.sslip.io/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      //   console.error(json.errors);
      throw new Error('Failed to fetch API');
    }

    return json.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHomePage = async () => {
  const data = fetchAPI(`
  {
    homePage {
      firstName
      lastName
      home {
        ...homeDetails
      }
      aboutMe {
        ...aboutMeDetails
      }
      meta {
        id
        name
        value
      }
      counter {
        id
        number
        description
      }
      dynamicFields {
        __typename
        ... on ComponentHomePageServices {
          title
          description
          servicesList {
            id
            icon
            title
            description
          }
        }
        ... on ComponentHomePageSkills {
          title
          description
          buttonText
          buttonLink
          skills {
            id
            name
            ratting
            link
          }
        }
        ... on ComponentHomePagePortfolio {
          title
          description
          projects {
            id
            projectName
            Description
            link
            role
            video {
              ...file
            }
            images {
              ...file
            }
          }
        }
        ... on ComponentHomePageTestimonial {
          title
          description
          testimonialList {
            name
            testimonial
            companyName
            avatar {
              ...file
            }
          }
        }
      }
    }
  }

  fragment homeDetails on ComponentHomePageHome {
    content
    buttonText
    buttonLink
    backgroundMedia {
      ...file
    }
  }

  fragment aboutMeDetails on ComponentHomePageAboutMe {
    content
    buttonText
    buttonLink
    profilePicture {
      ...file
    }
  }

  fragment file on UploadFile {
    name
    caption
    formats
    url
  }
    `);
  return data;
};
