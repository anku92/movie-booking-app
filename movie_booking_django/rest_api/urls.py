from django.urls import path
from .views import *

urlpatterns = [
    # Movie URLs
    path("movies/", MovieListView.as_view(), name="movie-list"),
    path("movie/add/", MovieCreateView.as_view(), name="add-movie"),
    path("movies/<int:pk>/", MovieDetailView.as_view(), name="update-del-movie"),
    path("movies/filter/", MovieFilterView.as_view(), name="movie-filter"),
    
    # User URLs
    path("users/", UserListView.as_view(), name="user-list"),
    path("users/<int:pk>/", UserDetailView.as_view(), name="update-del-user"),
    path("signup/", UserCreateView.as_view(), name="user-signup"),
    path("login/", LoginView.as_view(), name="login"),
    path('users/<int:user_id>/toggle/', UpdateFavoriteCinemas.as_view(), name='update-favorite-cinemas'),

    # Cinema URLs
    path("cinemas/", CinemaListView.as_view(), name="all-cinemas"),
    path("cinema/add/", CinemaCreateView.as_view(), name="add-cinema"),
    path("cinemas/<int:cinema_id>/", CinemaDetailView.as_view(), name="update-cinema"),
    
    # Ticket URLs
    path("ticket/add/", TicketCreateView.as_view(), name="create-ticket"),
    path("users/<int:user_id>/tickets/", UserTicketListView.as_view(), name="view-ticket"),
    path("users/<int:user_id>/tickets/<int:ticket_id>/", UserTicketDeleteView.as_view(), name="delete-ticket"),
]