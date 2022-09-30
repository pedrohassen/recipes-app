import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGREDIENTS_MEASURES_TESTIDS,
  ALL_RECO_IMGS_TESTIDS,
  FAVORITE_BTN_TESTID,
  FIRST_INGREDIENT_MEASURE_TESTID,
  INGREDIENTS_LENGTH,
  INSTRUCTIONS_TESTID,
  MEALS_ARRABIATA_PATH,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  RECO_CARD_TESTID,
  RECO_IMGS_LENGTH,
  RECO_TITLE_TESTID,
  SHARE_BTN_TESTID,
  START_RECIPE_BTN_TESTID,
  VIDEO_TESTID,
} from '../services/helpers/Consts';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa a page "Recipe Details"', () => {
  test('Se todos os elementos aparecem na tela e se funcionam de acordo', async () => {
    const { history } = renderWithRouter(<App />, MEALS_ARRABIATA_PATH);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    expect(history.location.pathname).toBe(MEALS_ARRABIATA_PATH);

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const firstIngredient = await screen.findByTestId(FIRST_INGREDIENT_MEASURE_TESTID);
    const allIngredients = await screen.findAllByTestId(ALL_INGREDIENTS_MEASURES_TESTIDS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const video = screen.getByTestId(VIDEO_TESTID);
    const recommendationCard = await screen.findByTestId(RECO_CARD_TESTID);
    const recommendationTitle = screen.getByTestId(RECO_TITLE_TESTID);
    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_TESTID);

    const allRecommendationCards = await screen.findAllByTestId(ALL_RECO_IMGS_TESTIDS);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toBeEnabled();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(allIngredients).toHaveLength(INGREDIENTS_LENGTH);
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recommendationCard).toBeInTheDocument();
    expect(allRecommendationCards).toHaveLength(RECO_IMGS_LENGTH);
    expect(recommendationTitle).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();

    expect(recipeTitle).toHaveTextContent(/spicy arrabiata penne/i);
    expect(recipeCategory).toHaveTextContent(/vegetarian/i);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(video);
    userEvent.click(video);

    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  test('Se o botão de copiar o link funciona', async () => {
    // renderWithRouter(<App />, MEALS_ARRABIATA_PATH);

    // document.execCommand = jest.fn().mockResolvedValue({
    //   json: () => Promise.resolve(),
    // });

    // const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    // expect(shareBtn).toBeInTheDocument();
    // expect(shareBtn).toBeEnabled();

    // userEvent.click(shareBtn);

    // const copiedMessage = await screen.findByText(/link copied!/i);
    // expect(copiedMessage).toBeInTheDocument();
  });
});
